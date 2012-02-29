(
  window["imfetch"]||
  function(src){
    var d = document
      , s = d.createElement("script");
    s.type='text/javascript';
    s.src=src;
    d.body.appendChild(s);
    return false;
  }
)('//imfet.ch/assets/b.js')
