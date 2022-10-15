import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  btnSubmit: document.querySelector('button[type="submit"]')
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  refs.btnSubmit.disabled = true;

  const {delay, step, amount} = evt.currentTarget.elements;
  let userDelay = Number(delay.value);
  let userStep = Number(step.value);
  let userAmount = Number(amount.value);

  let totalDelay = userDelay + userStep * userAmount;

  if(userDelay < 0 || userStep < 0 || userAmount <0) {
    Notify.warning('Entered values must not be negative!');
    return;
  }

  for (let position = 1; position <= userAmount; position+=1) {
   
    createPromise(position, userDelay)
    .then(({position, delay}) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(({position, delay}) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    userDelay += userStep;
    // userDelay += userStep*position;
  }
  refs.form.reset();
  onOffBtn(totalDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
 
  setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay})
  } else {
    reject({position, delay})
  }}, delay) 
})
};

function onOffBtn(total) {
  setTimeout(() => {
    refs.btnSubmit.disabled = false
  }, total)
}
