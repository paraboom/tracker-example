## How to run

- First of you have to have Node.js installed on your local machine (my local version is `v17.3.0`)
- Run `yarn install` to install all dependencies
- To emulate different hosts and domains I run the same app on 2 ports - 3000 and 3002. You can run `yarn demo` to launch 2 instances of the app
- After that visit `http://localhost:3000`

Note that the `http://localhost:3000` in that situation is a *site*, which installs a script and `http://localhost:3002` is the service which serves tracking scripts.