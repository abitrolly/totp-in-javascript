function unbase32x(s){
	let p = 0, t = s?.toLowerCase().match(/=.*|\S/gs)?.map(c => {
		const i = 'abcdefghijklmnopqrstuvwxyz234567'.indexOf(c);
		if(i >= 0) return i.fmt(2, 5);
		if(/[^=\s]/.test(c)) throw `'${c}' not allowed in base32`;
		p = c.match(/=/g).length; return '';
	}).join('');
	if(!t) throw 'empty key';
	if(p){
		if(p > 6 || t.length + p * 5 & 7) throw 'bogus padding of key';
		if((t.length & 7) > 4 || t.substring(t.length & ~7) - 0)
			throw 'overlong base32 encoding of key';
	}else if(t.length & 7)
		throw `bad ${t.length} bits key length`;
	return new Uint8Array(t.match(/.{8}/g).map(d => parseInt(d, 2)));
}
