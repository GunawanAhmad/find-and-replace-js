function computeLPSArray(pat, m, lps) {
  let len = 0;
  lps[0] = 0;

  let i = 1;
  while (i < m) {
    if (pat[i] == pat[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len != 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
}

export default function KMPSearch(pat, txt, isAll = false, isExact = false) {
  let M = pat.length;
  let N = txt.length;
  let positionIndex = [];
  let lasPos = null;

  let lps = [];
  computeLPSArray(pat, M, lps);
  let j = 0;
  let i = 0;
  while (i < N) {
    if (pat[j] == txt[i] || (pat[j] == "*" && txt[i] != " ")) {
      j++;
      i++;
    }
    if (j == M) {
      if (isExact) {
        if (
          !txt[i - j - 1] ||
          (txt[i - j - 1] == " " && (!txt[i] || txt[i] == " "))
        ) {
          // console.log(i - 1);
          positionIndex.push(i - j);
        }
        j = lps[j - 1];
      } else {
        if (lasPos == i - j) {
          j = lps[j - 1];
        } else {
          positionIndex.push(i - j);
          lasPos = i - 1;
          j = 0;
          if (isAll) {
            console.log("hei");
            return positionIndex;
          }
        }
      }
    } else if (i < N && pat[j] != txt[i] && pat[j] != "*") {
      if (j != 0) {
        j = lps[j - 1];
      } else {
        i = i + 1;
      }
    } else if (pat[j] == "*" && txt[i] == " ") {
      // i++;
      j = 0;
    }
  }
  return positionIndex;
}
