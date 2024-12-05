Feature('Review a Restaurant in Detail Page');

Scenario('Add review a restaurant to favorites', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement("a[href='#/detail/s1knt6za9kkfw1e867']", 5);
  I.click("a[href='#/detail/s1knt6za9kkfw1e867']");
  I.waitForElement('#review-form', 5);
  I.waitForElement('#form-review', 5);

  I.fillField('Nama', 'Tese2eR');
  I.fillField('Review', 'Tese2eR');

  I.click('#button-submit-review');
  I.wait(1);

  I.seeInPopup('Review berhasil ditambahkan!');
  I.acceptPopup();
});
