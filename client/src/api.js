export async function getSongs(filters = {}){
    const params = new URLSearchParams();

    if(filters.search){
        params.append("search", filters.search);
    }

    if(filters.instrument){
        params.append("instrument", filters.instrument);
    }

    if(filters.status){
        params.append("status", filters.status);
    }

    const response = await fetch(`/api/songs?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch songs");
    }

    return response.json();
}

export async function createSongs(songData){
    const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songData)
    });

    if (!response.ok){
        throw new Error("Failed to create song");
    }

    return response.json();

}

export async function updateSong(id, songData){
    const response = await fetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songData)
    });

    if (!response.ok){
        throw new Error("Failed to update song");
    }

    return response.json();
}

export async function deleteSong(id){
    const response = await fetch (`/api/songs/${id}`, {
        method: "DELETE"
    });

    if (!response.ok){
        throw new Error("Failed to delete song");
    }

    return response.json();
}