class Product {
  constructor(name, price, year) { //Se ejecuta apenas se instancie un objeto
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const prodList = document.getElementById('prod-list');

    const element = document.createElement('div'); //Create element for DOM
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Product</strong> : ${product.name}
          <strong>Price</strong> : ${product.price}
          <strong>Year</strong> : ${product.year}
          <a name="delete" href="#" class="btn btn-danger">Delete</a>
        </div>
      </div>
    `;

    prodList.appendChild(element);
  }

  deleteProduct(element) {
    //Validate if user has selected the element with name="delete"
    if(element.name === 'delete') {
      var getElement = element.parentElement.parentElement.parentElement;
      getElement.remove();

      this.showMessage('Product deleted succesfully', 'info');
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement('div');
    div.className = ('alert alert-' + cssClass + ' mt-4');
    div.appendChild(document.createTextNode(message));
    //Show in DOM
    const container = document.querySelector('.container');
    const app = document.querySelector('#App');
    container.insertBefore(div, app);

    function removeMessage() {
      document.querySelector('.alert').remove();
    }

    setTimeout(removeMessage,1000);
  }

  cleanForm(){
    document.getElementById('prod-form').reset();
  }
}

//DOM events

/* Event of send form */
document.getElementById('prod-form').addEventListener('submit', SendForm); //addEventListener (Es un metodo para capturar eventos)

/* Capture delete button */
document.getElementById('prod-list').addEventListener('click', DeleteProd);

function SendForm(e) {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const year = document.getElementById('year').value;

  console.log(name, price, year);

  const product = new Product(name, price, year);

  const ui = new UI;

  if (name === '' || price === '' || year === '' ) {
    ui.showMessage('Complete please','danger');
  } else {

    ui.addProduct(product);
    ui.showMessage('Product added succesfully', 'success');
    ui.cleanForm(); //Clean form
  }

  e.preventDefault(); //Cancela el evento(refresh) que esta por default
}

function DeleteProd(e) {

  const ui = new UI;
  ui.deleteProduct(e.target); //The element was clicked for the user
}
