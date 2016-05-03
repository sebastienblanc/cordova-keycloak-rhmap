var auth;
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
      var keycloakAuth = new Keycloak('keycloak.json');
        keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
        auth = keycloakAuth;

    }).error(function () {
          //  window.location.reload();
        });
}


document.getElementById('say_hello').onclick = function () {
  document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
  $fh.cloud(
      {
        path: 'hello',
        data: {
          hello: document.getElementById('hello_to').value
        },
        headers : {'Authorization':'Bearer ' + auth.token}
      },
      function (res) {
        document.getElementById('cloudResponse').innerHTML = "<p>" + res.msg + "</p>";
      },
      function (code, errorprops, params) {
        alert('An error occured: ' + code + ' : ' + errorprops);
      }
  );
};
