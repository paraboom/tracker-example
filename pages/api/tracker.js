const otherScript = `
    var script = document.createElement('script');
    script.async = true;
    script.src = "http://localhost:3002/api/other";
    document.head.appendChild(script);
    script.onload = () => {
        alert("Here we can use variables set by other scripts" + window.otherObject);
    }
`

const siteDependentScripts = {
    'ASDF-FDSA': [
        otherScript
    ]
}

const commonTracketScript = `
    var div = document.createElement('div');
    div.innerHTML = '<p>Here is a log of your clicks</p>';
    document.body.prepend(div);
    var counter = 0;
    document.body.addEventListener('click', () => {
        var p = document.createElement('p');
        p.innerHTML = "You've clicked " + ++counter;
        div.appendChild(p);
    });
`

export default function handler(req, res) {
    const { siteId } = req.query;

    let resultScript = [commonTracketScript];
    const siteSpecificScripts = siteDependentScripts[siteId];
    resultScript = resultScript.concat(siteSpecificScripts).join('\n\n');

    res
        .status(200)
        .send(resultScript);
  }
  