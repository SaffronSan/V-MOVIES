import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import {getBase, getKey} from "@/static/handleBasic.js"

export const useMainDataStore = defineStore('mainData',{
    state: () => {
        return {
            mainData : [], 
            searchHistory: [],
            totalRaw : [],
            fetching : false,
    }},
    getters: {
        getMovieById(state){
            return (Id) => {
                const item = state.mainData.filter(item => Id.includes(item.imdbID));
                if(item.length >= 1){
                    return item[0]
                }
                return item;
            }
        },
        getMovieByTitle(state){
            return (title) => {
                return this.totalRaw.filter((item)=> Object.keys(item)[0].includes(title))
            }
        }
    },
    actions : {
        setUp(){
            if(localStorage.getItem('movieData')){
                this.mainData = JSON.parse(localStorage.getItem('movieData'));
                this.searchHistory = JSON.parse(localStorage.getItem('searchedHist'));
                this.totalRaw = JSON.parse(localStorage.getItem('totalRaw'));
            }
        },
        async fetchData(title,year) {
            if(this.searchHistory.includes(title+(year? "-"+year : ''))){
                const foundObj = this.getMovieByTitle(title+(year? "-"+year : ''));
                this.mainData = foundObj[0][title+(year? "-"+year : '')];
                localStorage.setItem("movieData",JSON.stringify(this.mainData))
                return;
            }

            const copy = [...this.mainData];
            const response = await fetch(getBase()+getKey()+`&s=${title}${year? '&y='+year : ''}`);
            this.fetching = true;
            if (!response.ok) {
                return "Error"
            }
            const data = await response.json();
            this.mainData.forEach((item)=>{
                if(item.Poster && item.Poster !== "N/A"){
                    const img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.src = item.Poster;
                    new Promise((resolve)=>{
                        img.onload = () =>{
                            const colorThief = new ColorThief();
                            try {
                                const palette = colorThief.getPalette(img, 3);
                                item.palette = palette
                            } catch (e) {
                                resolve([]);
                            }
                        }
                        img.onerror = () => resolve([]);
                    })
                }
                if(item.Poster.includes("N/A")){
                    // Default gradient when pic does not exist
                    item.palette = [[255,255,255], [244, 244, 245]]
                    item.Poster = "https://placehold.co/400" 
                }
            })
            this.searchHistory.push(title+(year? "-"+year : ''));
            this.totalRaw.push({[title+(year? "-"+year : '')]: data.Search});
            this.mainData = data.Search;
            this.fetching = false;
            localStorage.setItem("movieData",JSON.stringify(this.mainData))
            localStorage.setItem("searchedHist",JSON.stringify(this.searchHistory));
            localStorage.setItem("totalRaw",JSON.stringify(this.totalRaw))
        },
        async setDetails(imbdID){
            const url = `${getBase()+getKey()}&i=${imbdID}&plot=full`;
            this.fetching = true;
            if(this.getMovieById(imbdID).details){
                this.fetching = false;
                return;
            }
            const res = await fetch(url);
            if (!res.ok) {
                return "Error"
            }
            const data = await res.json();
            this.getMovieById(imbdID).details = data;
            this.getMovieById(imbdID).details.Actors = this.getMovieById(imbdID).details.Actors.split(",");
            this.getMovieById(imbdID).details.Director = this.getMovieById(imbdID).details.Director.split(",");
            this.getMovieById(imbdID).details.Writer = this.getMovieById(imbdID).details.Writer.split(",");
            this.fetching = false;
            localStorage.setItem("movieData",JSON.stringify(this.mainData))
        }
    }
});
