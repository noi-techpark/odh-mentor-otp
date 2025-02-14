const _ = require('lodash')
const flow = require('lodash/fp/flow')
const head = require('lodash/fp/head')
const pick = require('lodash/fp/pick')
const keys = require('lodash/fp/keys')
const fs = require('fs')
const sh = require('shelljs')
const yaml = require('js-yaml')
const args = require('yargs').argv
let multiFile = false
let envId
let ENVID
let environmentType
let environmentTypes
let environments
let config

/*function addHttp(url) {
  //TODO const port ENV.API_PORT
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    }
    else {
      let prot = 'http'+(port===443?'s':'');
    return prot+'://' + url;
    }
}*/

function load (opts) {
  let env, basepath;

  if (_.isPlainObject(opts)) {
    ({env, basepath} = opts);
  }

  config = loadConfig(basepath)
  environments = config.environments || {}
  envId = getEnvId(config, env)
  ENVID = envId ? envId.toUpperCase() : undefined
  environmentTypes = environments.static || keys(config)
  environmentType = _.includes(environmentTypes, envId) ? envId : environments.default
  config = swapVariables(config)
  return config
}

function loadConfigFile (file) {
  try {
    return yaml.load(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    if (!/ENOENT:\s+no such file or directory/.test(e)) {
      console.log('Error Loading ' + file + ':', e)
      throw e
    }
  }
}

function loadConfig (basepath = '.') {
  if (fs.existsSync(`${basepath}/config.yml`)) {
    return loadConfigFile(`${basepath}/config.yml`)
  } else {
    let templ = {}
    multiFile = true
    let files = fs.readdirSync(`${basepath}/config.yml`)
    for (let i = 0; i < files.length; i++) {
      if (files[i].endsWith('.yml')) {
        let keyName = files[i].substring(0, files[i].length - '.yml'.length)
        templ[keyName] = loadConfigFile(`${basepath}/config/` + files[i])
      }
    }
    return templ
  }
}

function getEnvIdFromBranch () {
  try {
    let branch = sh.exec('git name-rev HEAD --name-only', {silent: true}).stdout

    branch = _.last(_.split(branch, '/'))

    return _.trimEnd(_.truncate(branch, {
      length: 13,
      omission: ''
    }), '-').replace(/(\r\n|\n|\r)/gm, '')
  } catch (e) {
    console.log('ERR: ', e)
    // Do nothing
  }
}

function getEnvId (obj, env) {
  return env ||
        args.env ||
        flow(
          pick(keys(obj)),
          keys,
          head
        )(args) ||
        process.env.NODE_ENV ||
        getEnvIdFromBranch()
}

function substitute (file, p) {
  let success = false
  let replaced = p.replace(/\${([\w.-]+)}/g, function (match, term) {
    if (!success) {
      success = _.has(file, term)
    }
    return _.get(file, term) || match
  })
  return {success: success, replace: replaced}
}

function transform (file, obj) {
  let changed = false
  let resultant = _.mapValues(obj, function (p) {
    if (_.isPlainObject(p)) {
      let transformed = transform(file, p)
      if (!changed && transformed.changed) {
        changed = true
      }
      return transformed.result
    }
    if (_.isString(p)) {
      let subbed = substitute(file, p)
      if (!changed && subbed.success) {
        changed = true
      }
      return subbed.replace
    }
    if (_.isArray(p)) {
      for (let i = 0; i < p.length; i++) {
        if (_.isString(p[i])) {
          p[i] = substitute(file, p[i]).replace
        }
      }
    }
    return p
  })
  return {changed: changed, result: resultant}
}

function log () {
  console.log('CONFIG:', envId || '-', environmentType || '-')
}

function requireSettings (settings) {
  let erredSettings = []
  settings = _.isString(settings) ? [settings] : settings
  _.forEach(settings, function (setting) {
    if (!_.has(config, setting)) {
      erredSettings.push(setting)
    }
  })

  if (erredSettings.length > 1) {
    throw new Error('The following settings are required in config.yml: ' + erredSettings.join('; '))
  }

  if (erredSettings.length === 1) {
    throw new Error(erredSettings[0] + ' is required in config.yml')
  }
}

function stripComments(ymltext) {

	const lines = ymltext.split(/\r?\n/).map(line => {
		const trim = line.trim();
		return trim[0]!=='#' ? line : '';
	}).filter(line => {
		return line;
	});

	return lines.join('\n')+'\n';
}

function swapVariables (configFile) {
  function readAndSwap (obj) {
    let altered = false
    do {
      let temp = transform(obj, obj)
      obj = temp.result
      altered = temp.changed
    } while (altered)
    return obj
  }

  let file = multiFile ? _.mapValues(configFile, readAndSwap) : configFile
  file = _.merge(
    {},
    file || {},
    file[environmentType] || {},
    {
      envId: envId,
      ENVID: ENVID
    })
  const enved = transform(process.env, file).result;
  file = readAndSwap(enved)
  return file
}
module.exports = function(opts) {
  const c = load(opts);
  return c;
};
//module.exports = load()
module.exports.load = load
module.exports.log = log
module.exports.require = requireSettings
