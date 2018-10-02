'use strict';

export default class Form {

    constructor({ elem }) {

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);

        let nameElement = elem.querySelector('#name'),
            phoneElement = elem.querySelector('#phone'),
            emailElement = elem.querySelector('#email'),
            buttonElement = elem.querySelector('button.btn'),
            elementsArray = [nameElement, phoneElement, emailElement];

        elementsArray.forEach(item => {
            item.addEventListener('keydown', (e) => {
                validateLength(e.currentTarget);
            });
            item.addEventListener('change', (e) => {
                validate(e);
            });
        });

        let validate = (event) => {
            let target = event.currentTarget;
            switch (target.id) {
                case 'name': {
                    setValidateStatus(target, 1);
                    break;
                }
                case 'phone': {
                    let isValid = target.value.match(/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g);

                    isValid ? setValidateStatus(target, 1) : setValidateStatus(target, 0);
                    break;
                }
                case 'email': {
                    let emailRegExpr = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "g"),
                        isValid = target.value.match(emailRegExpr);

                    isValid ? setValidateStatus(target, 1) : setValidateStatus(target, 0);
                    break;
                }
            }
        }

        let disablingButton = () => {
            let isValid = elementsArray.every(item => {
                if (item.value.length) {
                    return true;
                }
            });
            isValid ? buttonElement.removeAttribute('disabled') : buttonElement.setAttribute('disabled', 'disabled');
        }

        let validateLength = (target) => {
            let value = target.value,
                maxlength = target.getAttribute('maxlength');
            if (value.length > maxlength) {
                value = value.split('').splice(0, maxlength).join('');
                target.value = value;
            }
        }

        let setValidateStatus = (target, status) => {
            status ? target.classList.add('valid') : target.classList.add('invalid');
            status ? '' : target.value = '';
            disablingButton();
            setTimeout(() => {
                status ? target.classList.remove('valid') : target.classList.remove('invalid');
            }, 2000);
        }

    }

}
