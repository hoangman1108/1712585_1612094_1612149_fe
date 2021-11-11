const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}


export default function makeData(data) {
  const lens = data?.length;
  const makeDataLevel = () => {
    return range(lens).map((d) => {
      return {
        ...data[d],
      }
    })
  }

  return makeDataLevel()
}
