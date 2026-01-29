
import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {

  const baseURL = 'https://restful-booker.herokuapp.com';

  test('Создание нового бронирования (POST /booking)', async ({ request }) => {

    // Данные для создания бронирования
    const bookingData = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    };

    // Отправляем POST-запрос
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData
    });

    // Проверка 1: статус-код
    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);

    // Получаем тело ответа
    const responseBody = await response.json();
    console.log('Тело ответа:', responseBody);

    // Проверка 2: наличие bookingid
    expect(responseBody.bookingid).toBeTruthy();

    // Проверка 3: данные в ответе совпадают с отправленными
    const booking = responseBody.booking;

    expect(booking.firstname).toBe(bookingData.firstname);
    expect(booking.lastname).toBe(bookingData.lastname);
    expect(booking.totalprice).toBe(bookingData.totalprice);
    expect(booking.depositpaid).toBe(bookingData.depositpaid);
    expect(booking.bookingdates.checkin).toBe(bookingData.bookingdates.checkin);
    expect(booking.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);
    expect(booking.additionalneeds).toBe(bookingData.additionalneeds);
  });

});


/////////////////////////////////////////////////////////////

test.describe('API-тесты для Restful-booker', () => {

  const baseURL = 'https://restful-booker.herokuapp.com';

  test('Получение информации о бронировании (GET /booking/{id})', async ({ request }) => {

    // ШАГ 1. Создаём бронирование, чтобы получить bookingid
    const bookingData = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    };

    const createResponse = await request.post(`${baseURL}/booking`, {
      data: bookingData
    });

    console.log(`Статус-код создания: ${createResponse.status()}`);
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    console.log('Ответ на создание:', createBody);

    const bookingId = createBody.bookingid;
    expect(bookingId).toBeTruthy();


    // ШАГ 2. Получаем бронирование по ID
    const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);

    console.log(`Статус-код GET: ${getResponse.status()}`);
    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    console.log('Ответ GET:', getBody);


    // ШАГ 3. Проверяем, что данные совпадают
    expect(getBody.firstname).toBe(bookingData.firstname);
    expect(getBody.lastname).toBe(bookingData.lastname);
    expect(getBody.totalprice).toBe(bookingData.totalprice);
    expect(getBody.depositpaid).toBe(bookingData.depositpaid);
    expect(getBody.bookingdates.checkin).toBe(bookingData.bookingdates.checkin);
    expect(getBody.bookingdates.checkout).toBe(bookingData.bookingdates.checkout);
    expect(getBody.additionalneeds).toBe(bookingData.additionalneeds);
  });

});

///////////////////////////////////////////////////////////////////////////

test.describe('API-тесты для Restful-booker', () => {

  const baseURL = 'https://restful-booker.herokuapp.com';

  test('Обновление бронирования (PUT /booking/{id})', async ({ request }) => {

    // ШАГ 1. Получаем токен авторизации
    const authResponse = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    console.log(`Статус-код авторизации: ${authResponse.status()}`);
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    console.log('Ответ авторизации:', authBody);

    const token = authBody.token;
    expect(token).toBeTruthy();


    // ШАГ 2. Создаём бронирование, чтобы получить bookingid
    const bookingData = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    };

    const createResponse = await request.post(`${baseURL}/booking`, {
      data: bookingData
    });

    console.log(`Статус-код создания: ${createResponse.status()}`);
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    console.log('Ответ создания:', createBody);

    const bookingId = createBody.bookingid;
    expect(bookingId).toBeTruthy();


    // ШАГ 3. Обновляем бронирование (PUT)
    const updatedData = {
      firstname: 'Гендальф',
      lastname: 'Серый',
      totalprice: 555,
      depositpaid: false,
      bookingdates: {
        checkin: '2024-05-01',
        checkout: '2024-05-10'
      },
      additionalneeds: 'Late checkout'
    };

    const updateResponse = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: updatedData,
      headers: {
        Cookie: `token=${token}`
      }
    });

    console.log(`Статус-код обновления: ${updateResponse.status()}`);
    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();
    console.log('Ответ обновления:', updateBody);


    // ШАГ 4. Проверяем, что данные обновились
    expect(updateBody.firstname).toBe(updatedData.firstname);
    expect(updateBody.lastname).toBe(updatedData.lastname);
    expect(updateBody.totalprice).toBe(updatedData.totalprice);
    expect(updateBody.depositpaid).toBe(updatedData.depositpaid);
    expect(updateBody.bookingdates.checkin).toBe(updatedData.bookingdates.checkin);
    expect(updateBody.bookingdates.checkout).toBe(updatedData.bookingdates.checkout);
    expect(updateBody.additionalneeds).toBe(updatedData.additionalneeds);
  });

});

///////////////////////////////////////////////////////


test.describe('API-тесты для Restful-booker', () => {

  const baseURL = 'https://restful-booker.herokuapp.com';

  test('Удаление бронирования (DELETE /booking/{id})', async ({ request }) => {

    //  ШАГ 1. Получаем токен авторизации 
    const authResponse = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    console.log(`Статус-код авторизации: ${authResponse.status()}`);
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    console.log('Ответ авторизации:', authBody);

    const token = authBody.token;
    expect(token).toBeTruthy();


    //  ШАГ 2. Создаём бронирование, чтобы получить bookingid
    const bookingData = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    };

    const createResponse = await request.post(`${baseURL}/booking`, {
      data: bookingData
    });

    console.log(`Статус-код создания: ${createResponse.status()}`);
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    console.log('Ответ создания:', createBody);

    const bookingId = createBody.bookingid;
    expect(bookingId).toBeTruthy();


    // ШАГ 3. Удаляем бронирование
    const deleteResponse = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    console.log(`Статус-код удаления: ${deleteResponse.status()}`);
    expect(deleteResponse.status()).toBe(201); // ожидаемый статус


    // ШАГ 4. Дополнительная проверка: GET после удаления
    const getAfterDelete = await request.get(`${baseURL}/booking/${bookingId}`);

    console.log(`Статус-код GET после удаления: ${getAfterDelete.status()}`);
    expect(getAfterDelete.status()).toBe(404); // запись должна быть удалена
  });

});