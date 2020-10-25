module.exports = function check(str, bracketsConfig) {
  var chars = str.split('');
  var different_brackets = {}, simmilar_brackets = {};

  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] !== bracketsConfig[i][1]) {
      different_brackets["" + bracketsConfig[i][0] + bracketsConfig[i][1]] = 0;
    } else {
      simmilar_brackets["" + bracketsConfig[i][0] + bracketsConfig[i][1]] = 0;
    }
  }

  let pair_history = "";

  for (var i = 0, len = chars.length; i < len; i++) {
    let symbal = chars[i];
    for (const brackets_pair in different_brackets) {
      if (symbal === brackets_pair[0]) {
        different_brackets[brackets_pair] = different_brackets[brackets_pair] + 1;
        pair_history += brackets_pair;
      } else if (symbal === brackets_pair[1]) {
        if (different_brackets[brackets_pair] === 0) {
          return false;
        }
        if (pair_history.substring(pair_history.length - 2, pair_history.length) !== brackets_pair) {
          return false;
        }
        different_brackets[brackets_pair] = different_brackets[brackets_pair] - 1;
        pair_history = pair_history.substring(0, pair_history.length - 2);
      }
    }

    for (const brackets_pair in simmilar_brackets) {
      if (symbal === brackets_pair[0]) {
        if (pair_history.length > 0) {
          if (pair_history.substring(pair_history.length - 2, pair_history.length) === brackets_pair) {
            if (simmilar_brackets[brackets_pair] === 0) {
              return false;
            }
            simmilar_brackets[brackets_pair] = simmilar_brackets[brackets_pair] - 1;
            pair_history = pair_history.substring(0, pair_history.length - 2);
          } else {
            simmilar_brackets[brackets_pair] = simmilar_brackets[brackets_pair] + 1;
            pair_history += brackets_pair;
          }
        } else {
          simmilar_brackets[brackets_pair] = simmilar_brackets[brackets_pair] + 1;
          pair_history += brackets_pair;
        }
      }
    }

  }

  for (const brackets_pair in different_brackets) {
    if (different_brackets[brackets_pair] !== 0) {
      return false;
    }
  }
  for (const brackets_pair in simmilar_brackets) {
    if (simmilar_brackets[brackets_pair] !== 0) {
      return false;
    }
  }

  return true;
}

