const fetchAndInstantiateWasm = (url, imports) => {
    return fetch(url)
    .then(res=>{
        if(res.ok) {
            return res.arrayBuffer();
        throw new Error(`Unable to fetch WASM.!. ${url}` );
        }
    })
    .then(bytes => WebAssembly.compile(bytes))
    .then(module=>WebAssembly.instantiate(module, imports || {}))
    .then(instance => instance.exports);
};
fetchAndInstantiateWasm('./test.wasm')
.then(m => {window.getSqrt = m.getSqrt})