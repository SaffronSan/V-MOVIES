export async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.Poster) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = data.Poster;
            data.palette = await new Promise((resolve) => {
                img.onload = () => {
                    const colorThief = new ColorThief();
                    try {
                        const palette = colorThief.getPalette(img, 3);
                        resolve(palette);
                    } catch (e) {
                        resolve([]);
                    }
                };
                img.onerror = () => resolve([]);
            });
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}