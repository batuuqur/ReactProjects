export default function DNATemplate({sequence}) {
    return <h2>Template Strand: {sequence.join(' ')}</h2>;
}