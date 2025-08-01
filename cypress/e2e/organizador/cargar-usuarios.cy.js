describe('Ticketazo UI - Organizador', () => {
  beforeEach(() => {
    cy.session('organizador-session', () => {
      const organizador = Cypress.env('organizador');

      if (!organizador) {
        throw new Error('No se encontraron las credenciales del usuario organizador en cypress.env.json');
      }

      cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
      cy.get('[data-cy="input-email"]').type(organizador.email);
      cy.get('[data-cy="input-password"]').type(organizador.password);
      cy.get('[data-cy="btn-login"]').click();
      cy.url().should('not.include', '/auth/login');
    });
  });

    it('gestionar usuarios', () => {
        cy.visit('https://vps-3696213-x.dattaweb.com/');
        cy.get('button[aria-label="Toggle menu"]').eq(0).click();
        cy.get(':nth-child(4) > .pb-4').click();
        cy.wait(2000);
      });

       var usuario = {
            email: 'cargarejemplo@ejemplo.com',
            nombre: 'Cargar Ejemplo',
            telefono: '1234567890'
        };

        //cy.get('input[aria-label="Nombre de usuario"]').clear().type('CC2025');
        cy.get('input[aria-label="Correo electrónico"]').clear().type(usuario.email);
        cy.get('input[aria-label="Nombre"]').eq(1).clear().type(usuario.nombre);
        cy.get('input[aria-label="numero de telefono"]').clear().type(usuario.telefono);
        cy.get('button').contains(/^Cargar$/).click();
        cy.get('div.flex.flex-grow.flex-row.gap-x-4.items-center.relative')
            .then(($el) => {
                const texto = $el.text().trim();
                if (texto.includes('Usuario autorizado')) {
                    cy.log('✅ Usuario autorizado correctamente');
                } else {
                    cy.log('❌ No se pudo autorizar al usuario');
                }

            });

        cy.get('tr[data-cy^="row-usuario-"]', { timeout: 10000 }).should('exist');

        cy.get('tr[data-cy^="row-usuario-"]').then(($rows) => {
            // Verificar si el usuario está presente en la tabla

            const encontrado = Array.from($rows).some((row) => {
                return Cypress.$(row).find('td').text().trim().toLowerCase().includes(usuario.nombre.toLowerCase());
            });

            expect(encontrado, `Nombre ${usuario.nombre} encontrado en la tabla`).to.be.true;
        });

    })

