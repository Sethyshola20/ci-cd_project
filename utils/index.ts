export const deleteMovie = async (id: number) => {
    try {
        const response = await fetch(`/api/movies/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }
       const r =  await response.json();
        return r;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

export const getMovies = async () => {
    try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        
       const movies =  await response.json();
        return movies;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

export const getMovie = async (id: number) => {
    try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const movie = await response.json();
        return movie;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

export const createMovie = async (title: string, description: string) => {
    try {
        const response = await fetch("/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const movie = await response.json();
        return movie;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

export const updateMovie = async (id: number, title: string, description: string) => {
    try {
        const response = await fetch(`/api/movies/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const movie = await response.json();
        return movie;
    } catch (error:any) {
        throw new Error(error.message);
    }
}