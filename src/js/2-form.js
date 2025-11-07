const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

const save = (key, value) => {
try {
    localStorage.setItem(key, JSON.stringify(value));
} catch (e) {
    console.warn('LocalStorage save error:', e);
    }
};
const load = key => {
try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
} catch (e) {
    console.warn('LocalStorage load error:', e);
    return null;
    }
};
const remove = key => localStorage.removeItem(key);


const saved = load(STORAGE_KEY);
if (saved) {

    if (typeof saved.email === 'string') {
    email.value = saved.email;
    formData.email = saved.email;
    }
    if (typeof saved.message === 'string') {
    message.value = saved.message;
    formData.message = saved.message;
    }
}

form.addEventListener('input', evt => {
    const { name, value } = evt.target;


    if (!(name in formData)) return;

    formData[name] = value.trim();
    save(STORAGE_KEY, formData);
});

form.addEventListener('submit', evt => {
    evt.preventDefault();

    const current = {
        email: email.value.trim(),
        message: message.value.trim(),
    };


    if (!current.email || !current.message) {
    alert('Fill please all fields');
    return;
    }  


    console.log(current);

    remove(STORAGE_KEY);
    formData = { email: '', message: '' };
    form.reset();
});
