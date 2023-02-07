const videoCardContainer = document.querrySelector('.vedio-container');

let api_key ="AIzaSyAvDTeuNnKk-6fiLw7Fij4xzTdExZhYkL0";
let video_http ="https://www.googleapis.com/youtube/v3/videos?";
let channel_http =" https://www.googleapis.com/youtube/v3/channels?";
fetch(video_http + new URLSearchParams({
    key: api_key,
    part:'snippet',
    chart:'mostpopular',
    maxResults: 1,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    console.log(data);
   data.items.forEach(item => {
    getChannelIcon(item);
   });
})
.catch(Err => console.log(Err));

const getChannelIcon  = (video_data) =>{
    fatch(channel_http + new URLSearchParams({
        key:api_key,
        part:'snippet',
        id:video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data =>{
        video_data.channelThumbnail =data.item[0].snippet.thumbnails.default.url;
        console.log(data);
    })

}
const makeVideoCard =(data) => {

    videoCardContainer.innerHTML +=
    <div class="vedio">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon" alt="">
        <div class="info">
        <h6 class="title">${data.snippet.title}</h6>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
</div>
;
}