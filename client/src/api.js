export async function getSongs(){
    const response = await fetch("/api/songs");

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
        throw new Errpr("Failed to delete song");
    }

    return response.json();
}