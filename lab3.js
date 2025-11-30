class Direction {
  static _nextId = 1;

  constructor(name, department, governmentConnection, usersDay1, usersDay2, implementationTerm, termUnit) {
    this.id = Direction._nextId++;
    this.name = name;
    this.department = department;
    this.governmentConnection = governmentConnection;
    this.usersDay1 = usersDay1;
    this.usersDay2 = usersDay2;
    this.implementationTerm = implementationTerm;
    this.termUnit = termUnit;
  }

  _getTermInDays() {
    const termInDays = {
      'днів': 1,
      'місяців': 30,
      'років': 365,
      'тижнів': 7
    };
    return this.implementationTerm * (termInDays[this.termUnit] || 1);
  }

  getInfo() {
    return `ID: ${this.id}, Назва: ${this.name}, Відділ: ${this.department}, Термін: ${this.implementationTerm} ${this.termUnit}`;
  }
}

// створення 10 записів
const directions = [
  new Direction('Цифрова трансформація', 'IT-відділ', 'Співпраця з МЦІД', 150, 120, 2, 'років'),
  new Direction('Розвиток МСП', 'Економічний відділ', 'Партнерство з мінфіном', 200, 180, 18, 'місяців'),
  new Direction('Освітні проєкти', 'Освітній відділ', 'Взаємодія з МОН', 180, 200, 3, 'років'),
  new Direction('Інновації в медицині', 'Медичний відділ', 'Контакт з МОЗ', 120, 100, 4, 'років'),
  new Direction('Екологічна безпека', 'Екологічний відділ', 'Взаємодія з мінекології', 160, 140, 24, 'місяців'),
  new Direction('Розвиток транспорту', 'Транспортний відділ', 'Партнерство з мінінфраструктури', 130, 110, 3, 'років'),
  new Direction('Культурні ініціативи', 'Культурний відділ', 'Контакт з мінкультури', 110, 130, 18, 'місяців'),
  new Direction('Розвиток агросектору', 'Сільськогосподарський відділ', 'Взаємодія з мінагро', 140, 125, 2, 'років'),
  new Direction('Підвищення безпеки', 'Безпековий відділ', 'Партнерство з МВС', 170, 160, 12, 'місяців'),
  new Direction('Соціальні програми', 'Соціальний відділ', 'Контакт з мінсоцполітики', 190, 210, 18, 'місяців')
];

console.log('=== НАПРЯМИ ДІЯЛЬНОСТІ ===');
directions.forEach(dir => console.log(dir.getInfo()));

function sortDirectionsByTermAndCalcAverage() {

  const sortedDirections = [...directions];
  sortedDirections.sort((a, b) => a._getTermInDays() - b._getTermInDays());
  
  // використання reduce для групування
  const groupByTerm = sortedDirections.reduce((acc, dir) => {
    const termKey = `${dir.implementationTerm}${dir.termUnit}`;
    if (!acc[termKey]) {
      acc[termKey] = {
        directions: [],
        totalUsers: 0
      };
    }
    acc[termKey].directions.push(dir);
    acc[termKey].totalUsers += dir.usersDay1 + dir.usersDay2;
    return acc;
  }, {});

  console.log('\n=== ВПОРЯДКУВАННЯ НАПРЯМІВ ЗА ТЕРМІНОМ ===');
  console.log('Відсортовані напрями:');
  sortedDirections.forEach(dir => {
    console.log(`  ${dir.name} - ${dir.implementationTerm} ${dir.termUnit}`);
  });

  console.log('\n=== СЕРЕДНЯ КІЛЬКІСТЬ КОРИСТУВАЧІВ ЗА ТЕРМІНОМ ===');
  for (let termKey in groupByTerm) {
    const group = groupByTerm[termKey];
    const avgUsers = group.totalUsers / (group.directions.length * 2);
    console.log(`${termKey}: середня = ${avgUsers.toFixed(2)} користувачів`);
    console.log(`  Напрями: ${group.directions.map(d => d.name).join(', ')}`);
  }

  return { sortedDirections, groupByTerm };
}

function findMaxUsersDirection() {
  // використання reduce для пошуку максимуму
  const maxDirection = directions.reduce((max, current) => {
      return (current.usersDay1 > max.usersDay1) ? current : max;
  }, directions[0]);

  console.log('\n=== НАПРЯМ З МАКСИМАЛЬНОЮ КІЛЬКІСТЮ КОРИСТУВАЧІВ (за добу_1) ===');
  console.log(`Напрям: ${maxDirection.name}`);
  console.log(`Користувачів: ${maxDirection.usersDay1}`);
  console.log(`Реалізуючий відділ: ${maxDirection.department}`);

  return maxDirection;
}

function addNewDirection(name, department, governmentConnection, usersDay1, usersDay2, implementationTerm, termUnit) {
  const newDirection = new Direction(name, department, governmentConnection, usersDay1, usersDay2, implementationTerm, termUnit);

  const allFieldsFilled = name && department && governmentConnection &&
                          usersDay1 !== undefined && usersDay2 !== undefined &&
                          implementationTerm && termUnit;

  if (allFieldsFilled) {
    directions.unshift(newDirection);
    console.log('\n=== ДОДАВАННЯ НОВОГО НАПРЯМУ (ІНФОРМАЦІЯ ПОВНА) ===');
    console.log(`Новий напрям "${newDirection.name}" добавлений в ПОЧАТОК списку`);
  } else {
    directions.push(newDirection);
    console.log('\n=== ДОДАВАННЯ НОВОГО НАПРЯМУ (НЕПОВНА ІНФОРМАЦІЯ) ===');
    console.log(`Напрям з відсутніми даними добавлений в КІНЕЦЬ списку`);
  }

  return newDirection;
}

function calculateCombinedDuration(directionIds) {
  console.log('\n=== ОБЧИСЛЕННЯ ТРИВАЛОСТІ РЕАЛІЗАЦІЇ ДЕКІЛЬКОХ НАПРЯМІВ ОДНОЧАСНО ===');

  const selectedDirections = directions.filter(dir => directionIds.includes(dir.id));

  if (selectedDirections.length === 0) {
    console.log('Напрями не знайдені');
    return 0;
  }

  const departmentGroups = {};
  selectedDirections.forEach(dir => {
    if (!departmentGroups[dir.department]) {
      departmentGroups[dir.department] = [];
    }
    departmentGroups[dir.department].push(dir);
  });

  console.log(`Вибрано ${selectedDirections.length} напрямів`);

  for (let deptName in departmentGroups) {
    const deptDirections = departmentGroups[deptName];

    // використання reduce для підрахунку суми
    const totalDuration = deptDirections.reduce((sum, dir, index) => {
        const baseDuration = dir._getTermInDays();
        return sum + (index === 0 ? baseDuration : baseDuration * 1.1);
    }, 0);

    const years = Math.floor(totalDuration / 365);
    const months = Math.floor((totalDuration % 365) / 30);
    const days = Math.floor(totalDuration % 30);

    console.log(`\nВідділ: ${deptName}`);
    console.log(`  Напрями: ${deptDirections.map(d => d.name).join(', ')}`);
    console.log(`  Загальна тривалість: ${years}р. ${months}міс. ${days}днів (${totalDuration.toFixed(1)} днів)`);
  }
}

class User {
  constructor(surname, name, age, education, feedbackReason, contactDate, contactTime) {
    this.surname = surname;
    this.name = name;
    this.age = age;
    this.education = education; 
    this.feedbackReason = feedbackReason;
    this.contactDate = new Date(contactDate); 
    this.contactTime = contactTime; 
  }

  _getContactHour() {
    const parts = this.contactTime.split(':');
    return parseInt(parts[0]);
  }

  getFullName() {
    return `${this.surname} ${this.name}`;
  }

  getInfo() {
    return `${this.getFullName()}, вік: ${this.age}, освіта: ${this.education}, час: ${this.contactTime}`;
  }
}

const users = [
  new User('Іванченко', 'Артур', 28, 'вища', 'Запит про послугу', '2024-11-10', '14:30'),
  new User('Мельник', 'Любомир', 45, 'вища', 'Скарга', '2024-11-15', '10:15'),
  new User('Шевченко', 'Анна', 32, 'середня', 'Пропозиція', '2024-11-20', '18:45'),
  new User('Сидоренко', 'Олег', 52, 'вища', 'Запит інформації', '2024-11-05', '11:00'),
  new User('Грінченко', 'Марія', 27, 'без освіти', 'Скарга', '2024-11-18', '22:30'),
  new User('Солованюк', 'Василь', 61, 'середня', 'Пропозиція', '2024-11-12', '08:15'),
  new User('Мигорець', 'Світлана', 35, 'вища', 'Запит послуги', '2024-11-08', '13:00'),
  new User('Тимощук', 'Артем', 24, 'без освіти', 'Запит інформації', '2024-11-25', '20:00'),
  new User('Ковальчук', 'Тетяна', 39, 'вища', 'Скарга', '2024-11-22', '09:30'),
  new User('Явір', 'Константин', 48, 'середня', 'Пропозиція', '2024-11-14', '19:45')
];

console.log('\n\n=== ОБЛІКОВІ ЗАПИСИ КОРИСТУВАЧІВ ===');
users.forEach(user => console.log(user.getInfo()));

function filterUsersByMonthAndTime(month, hour) {
  console.log('\n=== КОРИСТУВАЧІ ЗА МІСЯЦЕМ І ЧАСОМ ===');
  console.log(`Параметри: місяць ${month}, час ${hour}:00`);

  const filtered = users.filter(user => {
    const userMonth = user.contactDate.getMonth() + 1; 
    const userHour = user._getContactHour();
    return userMonth === month && userHour === hour;
  });

  if (filtered.length === 0) {
    console.log('Користувачів не знайдено');
  } else {
    console.log(`Знайдено: ${filtered.length}`);
    filtered.forEach(user => console.log(`  - ${user.getInfo()}`));
  }

  return filtered;
}

function findMinAgeAndEducation() {
  console.log('\n=== МІНІМАЛЬНИЙ ВІК І ОСВІТА ===');

  //використання reduce для пошуку мінімуму
  const minAgeUser = users.reduce((min, current) => {
      return (current.age < min.age) ? current : min;
  }, users[0]);

  console.log(`Користувач з мінімальним віком: ${minAgeUser.getFullName()}`);
  console.log(`Вік: ${minAgeUser.age}`);
  console.log(`Освіта: ${minAgeUser.education}`);

  return minAgeUser;
}

function classifyUsers() {
  console.log('\n=== КЛАСИФІКАЦІЯ КОРИСТУВАЧІВ ===');

  const classes = {
    highEducationWorkHours: [],  
    noEducationOffHours: [],        
    others: []                       
  };

  let index = 0;
  do {
    const user = users[index];
    const userHour = user._getContactHour();
    const isWorkHours = userHour >= 9 && userHour <= 17;

    if (user.education === 'вища' && isWorkHours) {
      classes.highEducationWorkHours.push(user);
    } else if (user.education === 'без освіти' && !isWorkHours) {
      classes.noEducationOffHours.push(user);
    } else {
      classes.others.push(user);
    }

    index++;
  } while (index < users.length);

  console.log(`1. Вища освіта в робочий час (09:00-17:00): ${classes.highEducationWorkHours.length}`);
  classes.highEducationWorkHours.forEach(u => console.log(`   - ${u.getFullName()}`));

  console.log(`\n2. Без освіти в неробочий час: ${classes.noEducationOffHours.length}`);
  classes.noEducationOffHours.forEach(u => console.log(`   - ${u.getFullName()}`));

  console.log(`\n3. Інші: ${classes.others.length}`);
  classes.others.forEach(u => console.log(`   - ${u.getFullName()}`));

  return classes;
}

function sortUsersByNameAndShowFeedback() {
  console.log('\n=== КОРИСТУВАЧІ В АЛФАВІТНОМУ ПОРЯДКУ З МЕТОЮ ЗВОРОТНОГО ЗВ\'ЯЗКУ ===');

  const sortedUsers = [...users].sort((a, b) => {
    const surnameCompare = a.surname.localeCompare(b.surname);
    if (surnameCompare !== 0) {
      return surnameCompare;
    }
    return a.name.localeCompare(b.name);
  });

  sortedUsers.forEach(user => {
    console.log(`${user.getFullName()} - Мета: ${user.feedbackReason}`);
  });

  return sortedUsers;
}

console.log('\n\n------------------------------------------------------------------------------------');
console.log('               ВИКОНАННЯ ТА ТЕСТУВАННЯ ВСІХ ФУНКЦІЙ                            ');
console.log('------------------------------------------------------------------------------------');

sortDirectionsByTermAndCalcAverage();
findMaxUsersDirection();

addNewDirection('Розвиток туризму', 'Туристичний відділ', 'Контакт з мінекономіки', 250, 220, 2, 'років');
addNewDirection('Новий проєкт', 'Новий відділ', '', 100, 80, null, null);

calculateCombinedDuration([1, 2, 3]);

filterUsersByMonthAndTime(11, 14);  
filterUsersByMonthAndTime(11, 13);  
findMinAgeAndEducation();
classifyUsers();
sortUsersByNameAndShowFeedback();

console.log('\n\n------------------------------------------------------------------------------------');
console.log('                           КІНЕЦЬ ВИКОНАННЯ ТЕСТІВ');
console.log('------------------------------------------------------------------------------------');