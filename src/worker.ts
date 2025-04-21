import 'ses'

self.addEventListener('message', async (e) => {
	const { type } = e.data

	switch (type) {
		case 0x00: {
			const { url } = e.data
			
			const res = await fetch(url)
			const code = await res.text()

			const System = {
				skibidi: true
			}

			const c = new Compartment({
				globals: {
					console,
					System
				},
				__options__: true,
			})
			c.evaluate(code)

			break;
		}
	}
})
