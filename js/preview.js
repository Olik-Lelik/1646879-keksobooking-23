const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const getPreview = (input, cb) => {
  input.addEventListener('change', () => {
    const file = input.files[0];

    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const result = reader.result;
        cb(result);
      });

      reader.readAsDataURL(file);
    }
  });
};

export {getPreview};
