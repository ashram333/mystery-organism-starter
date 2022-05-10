// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,

    mutate() {
      const randomBase = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomBase] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomBase] = newBase;
      return this.dna;
    },

    compareDNA(orgObj) {
      let baseCounter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        let otherOrganism = orgObj.dna[i];
        let thisOrganism = this.dna[i];
        if (otherOrganism === thisOrganism) {
          baseCounter += 1;
        }
      }
      const dnaPercentage = Math.round((baseCounter / this.dna.length) * 100);

      console.log(
        `specimen #1 and specimen #2 have ${dnaPercentage}% DNA in common`
      );
    },

    willLikelySurvive() {
      let baseCG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C") {
          baseCG += 1;
        }
        if (this.dna[i] === "G") {
          baseCG += 1;
        }
      }
      const dnaPercentage = Math.round((baseCG / this.dna.length) * 100);

      if (dnaPercentage >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

const survived = [];

let i = 1;
while (survived.length < 30) {
  let newOrg = pAequorFactory(i, mockUpStrand());
  if (newOrg.willLikelySurvive() === true) {
    survived.push(newOrg);
  }
  i++;
}

console.log(survived);
