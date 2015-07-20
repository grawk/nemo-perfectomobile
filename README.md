# nemo-perfectomobile
PerfectoMobile plugin for NemoJS

## Installation

In your project where Nemo is already installed:

```bash
$ npm install --save nemo-perfectomobile
```

_or use `--save-dev` if nemo and plugins are development dependencies_

## Configuration

In the appropriate JSON configuration file, add this as a plugin:

```javascript
"plugins": {
    "perfectomobile": {
      "module": "nemo-perfectomobile",
      "arguments": ["path:report"]
    }
  },
```

_make sure the `/report` directory exists_

## API

`nemo.perfectomobile.getReport(filename)`
* `@argument filename {String}` (optional): provide a full name for your report file. Make sure to include either `.html` or `.pdf` 
in order to indicate which type of file you wish to save. If left blank, the plugin will auto-name and select `.html` as the 
report type.
* `@returns Promise`

Note that this method will execute `webdriver.close()` before requesting a report. So only call the method once you are done 
running any other webdriver commands.