describe('Burger Constructor Tests', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json');
    cy.fixture('user.json');
    cy.fixture('order.json');
    cy.intercept(
      { method: 'GET', url: 'api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIngredients');
    cy.intercept(
      { method: 'GET', url: 'api/auth/user' },
      { fixture: 'user.json' }
    ).as('getProfile');
    cy.intercept(
      { method: 'POST', url: 'api/orders' },
      { fixture: 'order.json' }
    ).as('order');
    cy.setCookie('accessToken', 'token123');
    localStorage.setItem('refreshToken', 'token123');

    cy.visit('http://localhost:4000/');
  });

  it('should add an ingredient to the constructor', () => {
    cy.wait('@getIngredients');
    cy.wait('@getProfile');
  });
  it('проверка нали', () => {
    cy.get(`[data-cy="constructor"]`).should('not.contain.text', 'Булка 1');
  });
  it('добавление булки', () => {
    cy.get(`[data-cy='ingredient-container']`)
      .first()
      .children()
      .first()
      .find('button')
      .click();
    cy.get(`[data-cy="constructor"]`).should('contain.text', 'Булка 1');
    cy.get(`[data-cy='ingredient-container']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();
    cy.get(`[data-cy="constructor"]`).should('contain.text', 'Начинка 1');
  });
  it(' открытия модального окна', () => {
    cy.contains('Булка 1').click();
    cy.get(`[data-cy='modalPopap']`).should('be.visible');
  });

  it('тест закрытия окна', () => {
    cy.contains('Булка 1').click();
    //на кнопку закрытия
    cy.get(`[data-cy='modalPopap']`).find('button').click();

    cy.get(`[data-cy='modalPopap']`).should('not.exist');

    cy.contains('Булка 1').click();
    //esc
    cy.get('body').type('{esc}');

    cy.get(`[data-cy='modalPopap']`).should('not.exist');

    cy.contains('Булка 1').click();
    //overlay
    cy.get(`[data-cy='Overlay']`).click('top', { force: true });

    cy.get(`[data-cy='modalPopap']`).should('not.exist');
  });
  it('Проверка авторизации ', () => {
    cy.visit('http://localhost:4000/profile');
    cy.get(`[data-cy='Profile']`).should('have.value', 'test');
  });

  it('добавляем ингред.', () => {
    cy.visit('http://localhost:4000');
    cy.get(`[data-cy='ingredient-container']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    // добавляем в заказ биокотлету
    cy.get(`[data-cy='ingredient-container']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();

    cy.get(`[data-cy='constructor']`).children().last().find('button').click();

    cy.wait('@order');

    cy.get(`[data-cy='modalPopap']`).should('be.visible');

    cy.get(`[data-cy='modalPopap']`).find('button').click();

    cy.get(`[data-cy='constructor']`)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');

    cy.get(`[data-cy='constructor']`)
      .children()
      .first()
      .next()
      .should('contain.text', 'Выберите начинку');
  });
});
