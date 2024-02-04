export function convertImage(singleFontImage) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			const img = new Image();
			img.src = reader.result;

			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Set the canvas dimensions to the new image dimensions
				let width = img.width;
				let height = img.height;
				const maxDimension = 1024; // maximum dimension for the resized image
				if (width > height) {
					if (width > maxDimension) {
						height *= maxDimension / width;
						width = maxDimension;
					}
				} else {
					if (height > maxDimension) {
						width *= maxDimension / height;
						height = maxDimension;
					}
				}
				canvas.width = width;
				canvas.height = height;

				// Draw the resized image on the canvas
				ctx.drawImage(img, 0, 0, width, height);

				// Convert the canvas content back to a Blob with a specific MIME type
				canvas.toBlob(
					(blob) => {
						if (blob) {
							resolve(blob);
						} else {
							console.error('Error creating the resized image blob');
							reject('Error creating the resized image blob');
						}
					},
					'image/jpeg',
					0.7
				);
			};
		};

		reader.onerror = (error) => {
			console.error('Error reading the image file: ', error);
			reject('Error reading the image file');
		};

		reader.readAsDataURL(singleFontImage);
	});
}

export function signatureImageConvert(signatureData) {
  // Convert the data URL to a Blob
  const byteString = atob(signatureData.split(',')[1]);
  const mimeString = signatureData.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });

  // Create a File object
  return new File([blob], 'signature.png', { type: mimeString });

}

export function base64ToFile(base64) {
	const fileName = 'new.jpg';
	const fileType = 'image/jpeg';
	if (!base64) {
		return null;
	  }
	const byteCharacters = atob(base64);
	const byteArrays = [];
  
	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
	  const slice = byteCharacters.slice(offset, offset + 512);
	  const byteNumbers = new Array(slice.length);
	  for (let i = 0; i < slice.length; i++) {
		byteNumbers[i] = slice.charCodeAt(i);
	  }
	  const byteArray = new Uint8Array(byteNumbers);
	  byteArrays.push(byteArray);
	}
  
	const blob = new Blob(byteArrays, { type: fileType });
	return new File([blob], fileName, { type: fileType });
  }

  export function base64ToPDF(base64) {
	const fileName = 'etin.pdf'; // Set the desired PDF filename
	const fileType = 'application/pdf'; // Set the PDF MIME type
	if (!base64) {
		return null;
	  }
	const byteCharacters = atob(base64);
	const byteArrays = [];
	
	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
	  const slice = byteCharacters.slice(offset, offset + 512);
	  const byteNumbers = new Array(slice.length);
	  
	  for (let i = 0; i < slice.length; i++) {
		byteNumbers[i] = slice.charCodeAt(i);
	  }
	  
	  const byteArray = new Uint8Array(byteNumbers);
	  byteArrays.push(byteArray);
	}
	
	const blob = new Blob(byteArrays, { type: fileType });
	return new File([blob], fileName, { type: fileType });
  }
  