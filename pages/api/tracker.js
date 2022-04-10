const otherScript = `
    var script = document.createElement('script');
    script.async = true;
    script.src = "http://localhost:3001/api/other";
    document.head.appendChild(script);
    script.onload = () => {
        alert("Here we can use variables set by other scripts" + window.otherObject);
    }
`

const siteDependentScripts = {
    'ASDF-FDSA': [
        otherScript,
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


const scriptTemplates = {
    piwik: data => {
        if (data.state !== 'enabled') return '';

        return `
            var script = document.createElement('script');
            script.async = true;
            script.src = "piwikserver" + ${data.PIWIKsiteId}; //env depended
            document.head.appendChild(script);
        `
    },
    toplist: data => {
        if (data.state !== 'enabled') return '';

        return `
            var div = document.findElementByID('${data.HTMLContainerID}');
            div.addAttribute('data-id', ${data.topListWidgetID});
        
            var script = document.createElement('script');
            script.async = true;
            script.src = "toplist"; //env depended
            document.head.appendChild(script);
        `
    },
}

export default function handler(req, res) {
    const { siteId } = req.query;

    let resultScript = [commonTracketScript];

    // fetch site settings
    const siteSpecificScripts = siteDependentScripts[siteId];


    // const siteSpecificScripts = [
    //     {
    //         type: 'piwik',
    //         params: {
    //             state: 'enabled',
    //             PIWIKsiteId: '34534'
    //         }
    //     },
    //     {
    //         type: 'toplist',
    //         params: {
    //             HTMLContainerID: 'toplist-contatiner',
    //             topListWidgetID: '5464564'
    //         }
    //     },
    // ]


    resultScript = resultScript.concat(siteSpecificScripts).join('\n\n');

    res
        .status(200)
        .send(resultScript);
  }
  