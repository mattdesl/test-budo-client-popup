# test-budo-client-popup

This is a test with advanced LiveReload features in [budo](https://github.com/mattdesl/budo). In this test, we send a LiveReload message to all connected clients when a Markdown file is changed by the developer.

A more practical example might be to show an error pop-up box in your browser window when you write a syntax error in SASS or LESS.

```sh
git clone https://github.com/mattdesl/test-budo-client-popup.git
cd test-budo-client-popup
npm install
npm run start
```

Now edit and save any Markdown file (such as this README) in the project directory, and you should see a popup box in the browser.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/test-budo-client-popup/blob/master/LICENSE.md) for details.
