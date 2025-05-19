const nucleotides = ['a', 'c', 'g', 't'];

export function dnaShortSequence() { 
    return Array.from({length:2},()=>
    nucleotides[Math.floor(Math.random()*nucleotides.length)]
    );
}

export function dnaSequence() { 
    return Array.from({ length: 24 }, () => 
    nucleotides[Math.floor(Math.random() * nucleotides.length)]
    );
};