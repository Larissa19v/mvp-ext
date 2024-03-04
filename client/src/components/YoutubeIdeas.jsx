export default function YoutubeIdeas() {
  let key = import.meta.env.VITE_YOUTUBE_API_KEY

  const handleYoutubeFetch = () => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&q=kids%20craft`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let videos = data.items;
        let firstVid = data.items[0];
        let firstVidId = data.items[0].id.videoId;
        console.log("First video id:", firstVidId);
        console.log(videos);
        videos.forEach((video) => {
          console.log(video.snippet.title);
          console.log(video.id.videoId);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <button onClick={handleYoutubeFetch}>Find a craft video</button>
      <div>
        <iframe src="https://www.youtube.com/embed/${firstVidId}"></iframe>
      </div>
    </>
  );
}
