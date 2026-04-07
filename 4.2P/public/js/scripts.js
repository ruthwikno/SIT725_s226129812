const submitForm = () => {
  let formData = {};
  formData.first_name = $('#first_name').val();
  formData.last_name = $('#last_name').val();
  formData.password = $('#password').val();
  formData.email = $('#email').val();

  fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      M.toast({ html: 'Signed up successfully!' });
      $('#modal1').modal('close');
    })
    .catch(error => console.error('Error:', error));
};

const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = '<div class="col s4 center-align">' +
      '<div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p>' + item.description + '</p></div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      'Top Speed: ' + item.topspeed + '<br>' +
      'Horsepower: ' + item.horsepower + '<br>' +
      'Acceleration: ' + item.acceleration + '<br>' +
      'Engine: ' + item.engine + '</p>' +
      '</div></div></div>';
    $("#card-section").append(itemToAppend);
    console.log('description: ' + item.description);
  });
};
$(document).ready(function () {
  $('.materialboxed').materialbox();
  $('.modal').modal();

  $('#formSubmit').click(() => {
    submitForm();
  });

  fetch('/api/cars')
    .then(response => response.json())
    .then(result => {
      console.log(result);
      addCards(result.data);
    })
    .catch(error => console.error('Error:', error));
});