 const cardList = [
{
  title: "Koenigsegg Regera",
  image: "images/koenigsegg.jpg",
  link: "About Koenigsegg Regera",
  description: "Top speed : 410 km/h\n0-100km/h : 2.8 sec\nEngine : 5.0L twin-turbo V8\nhorsepower : 1500 hp"
},
{
  title: "Bugatti Chiron",
  image: "images/Chiron.jpg",
  link: "About Bugatti Chiron",
  description: "Top speed : 420 km/h\n0-100km/h : 2.4 sec\nEngine : 8.0L W16 quad-turbocharged\nHorsepower : 1479 hp"
}
]
const clickMe = () => {
alert("Thanks for clicking me. Hope you have a nice day!")
}
const submitForm = () => {
let formData = {};
formData.first_name = $('#first_name').val();
formData.last_name = $('#last_name').val();
formData.password = $('#password').val();
formData.email = $('#email').val();
console.log("Form Data Submitted: ", formData);
}
const addCards = (items) => {
items.forEach(item => {
let itemToAppend = '<div class="col s4 center-align">'+
'<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
'</div><div class="card-content">'+
'<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
'<div class="card-reveal">'+
'<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
'<p class="card-text">'+item.description.replace(/\n/g,'<br>')+'</p>'+
'</div></div></div>';
$("#card-section").append(itemToAppend)
});
}
$(document).ready(function(){
$('.materialboxed').materialbox();
$('#formSubmit').click(()=>{
submitForm();
})
addCards(cardList);
$('.modal').modal();
});
