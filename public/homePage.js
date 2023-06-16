const logoutButton = new LogoutButton();

const ratesBoard = new RatesBoard();

const moneyManager = new MoneyManager();

const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

const current = ApiConnector.current((response) => {
  console.log(response);
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

function getRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

getRates();
// setInterval(getRates, 1000);

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Баланс пополнен');
    } else {
      moneyManager.setMessage(false, response.data);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Конвертация прошла успешно');
    } else {
      moneyManager.setMessage(false, response.data);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Перевод выполнен');
    } else {
      moneyManager.setMessage(false, response.data);
    }
  });
};

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    moneyManager.setMessage(false, response.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(true, 'Пользователь добавлен в избранное');
    } else {
      moneyManager.setMessage(false, response.data);
    }
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(true, 'Пользователь удален из избранного');
    } else {
      moneyManager.setMessage(false, response.data);
    }
  });
};
