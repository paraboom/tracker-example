const commonTracketScript = `
    window.otherObject = 'Variable set by OTHER script';
`

export default function handler(req, res) {
    res
        .status(200)
        .send(commonTracketScript);
  }
  