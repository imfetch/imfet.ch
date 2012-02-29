!function(w, d, b, url, api) {

function imfetch() {

  var ar = []
    , id = "imfetchengine" + Math.ceil(Math.random()*10000000)
    , imgs = $$("img")
    , dummy
    , form
    , json
    ;

  for(var i=0; i<imgs.length; i++){
    var img = imgs[i]
      , src = img.src
      ;
    if( /^https?\:\/\//.test(src) &&
        ar.indexOf(src)===-1 &&
        img.width > 10 &&
        img.height > 10 ) ar.push(src);
  }

  if(!ar.length) {
    alert("No images found!");
    return;
  }

  dummy = d.createElement("div")
  dummy.id = id;
  b.appendChild(dummy);
  dummy.style = "width:1px;height:1px;left:-10px;top:-10px;overflow:hidden;position:absolute;";
  dummy.innerHTML = '' +
    '<form action="'+api+'" name="'+id+'_form" target="'+id+'_iframe" method="post">' +
      '<input type="hidden" name="json">' +
      '<input type="hidden" name="ref" value="'+url+'">' +
    '</form>' +
    '<iframe name="'+id+'_iframe" id="'+id+'-iframe"></iframe>'
    ;
  form = document[id+"_form"];

  function $$(){ return d.querySelectorAll.apply(d,arguments) }

  function recv(e) {
    var hash = e.data;
    setTimeout(function(){
      try {
        dummy.parentNode.removeChild(dummy)
      } catch(e) {}
    },99);
    if(!hash) {
      alert("Sorry, failed.");
      return;
    }
    console.log(hash);
    w.removeEventListener("message", recv, false);
  }

  w.addEventListener("message", recv, false);

  json = JSON.stringify({
    image: ar,
    url: url,
    timestamp: new Date().getTime()
  });

  form.json.value = json;
  form.submit();

}

window["imfetch"] = imfetch;
imfetch();

}(
  window,
  document,
  document.body,
  document.location.href,
  '//a.imfet.ch/json'
)
