Feature('Liking and Unliking a Restaurant in Detail Page');

Scenario('should add a restaurant to favorites', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement("a[href='#/detail/s1knt6za9kkfw1e867']", 5);
  I.click("a[href='#/detail/s1knt6za9kkfw1e867']");
  I.waitForElement('#favorite-button-container', 5);
  I.waitForElement('#add-favorite-button', 5);

  I.click('#add-favorite-button');

  I.wait(1);

  I.seeInPopup('Kafe Kita telah ditambahkan ke daftar favorit.');
  I.acceptPopup();
});

Scenario('should remove a restaurant from favorites', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement("a[href='#/detail/s1knt6za9kkfw1e867']", 5);
  I.click("a[href='#/detail/s1knt6za9kkfw1e867']");
  I.waitForElement('#favorite-button-container', 5);
  I.waitForElement('#add-favorite-button', 5);

  I.click('#add-favorite-button');

  I.waitForElement('#delete-favorite-button', 5);

  I.wait(1);
  I.click('#delete-favorite-button');

  I.seeInPopup('Kafe Kita telah dihapus dari daftar favorit.');
  I.acceptPopup();
});
