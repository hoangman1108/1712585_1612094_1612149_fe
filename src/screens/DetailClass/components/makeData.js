import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    mssv: Math.floor(Math.random() * 300),
    name: namor.generate({ words: 3, numbers: 0 }),
    email: namor.generate({ words: 3, numbers: 0 }),
    dob: new Date().toISOString(),
    gender: Math.floor(Math.random() * 2) % 2 === 0 ? 'name' : 'nữ',
    role: Math.floor(Math.random() * 2) % 2 === 0 ? 'student' : 'teacher',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
