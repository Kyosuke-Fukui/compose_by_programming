var scoreObj;

//演奏
function onMidi(obj) {
if (ABCJS.synth.supportsAudio()) {
    var visualObj = ABCJS.renderAbc("notation", obj)[0];

    var synthControl = new ABCJS.synth.SynthController();
    synthControl.load("#audio", null, {
    displayRestart: true,
    displayPlay: true,
    displayProgress: true,
    });
    synthControl.setTune(visualObj, false);
} else {
    document.querySelector("#audio").innerHTML =
    "<div class='audio-error'>Audio is not supported in this browser.</div>";
}
}

//記譜
function onRender(tune, params) {
scoreObj = document.getElementById("score").value;

if (!params) params = {};
ABCJS.renderAbc("notation", tune, params);
document.getElementById("audio").innerHTML = "";
}
var cooleys =
'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n';

function example() {
onRender(cooleys);
onMidi(cooleys);
}

//テキストファイルをダウンロード
window.addEventListener('load', () => {
  const button1 = document.getElementById('save');
  button1.addEventListener('click', button1_clicked);
});

function button1_clicked(evt) {
  evt.preventDefault();
  
  scoreObj = document.getElementById("score").value;

  const blob = new Blob([scoreObj], {type: 'text/plain'}); //{endings:'native'}は不要？
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);

  a.download = `${toLocaleString(new Date)}.txt`;
  a.href = url;
  a.click();
  a.remove();
//   setTimeout(() => {
    URL.revokeObjectURL(url);
    // }, 1E4);
}

function toLocaleString( date )
{
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        ].join( '' ) 
}