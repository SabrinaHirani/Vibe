//Project: Vibe
//Author: Team Vibe
//Date: March 5, 2021

pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Vibe {

  struct Class {
    uint256 id;
    string name;
    address payable teacher;
    uint256 price;
    uint256 rating;
    string description;
    address[] students;
    address[] raters;
  }

  struct Lesson {
    string name;
    string content;
    string description;
  }

  struct Chat {
    address sender;
    string msg;
  }

    Class[] public classes;
    Lesson[][] public lessons;
    Chat[][] public chatroom;

    mapping(address => uint256[]) public classesTaughtBy;
    mapping(address => uint256[]) public classesStudiedBy;




    function getClass(uint256 i) public view returns (Class memory) {
      assert(i <= classes.length);

        return classes[i];
    }

    function getLesson(uint256 i, uint256 j) public view returns (Lesson memory) {
      assert(i <= lessons[i].length);

        return lessons[i][j];
    }

    function getClassCount() public view returns (uint256) {
        return classes.length;
    }

    function getLessonCount(uint256 i) public view returns (uint256) {
      assert(i <= lessons.length);

        return lessons[i].length;
    }

    function classesTaughtByCount(address user) public view returns (uint256) {
        return classesTaughtBy[user].length;
    }

    function classesStudiedByCount(address user) public view returns (uint256) {
        return classesStudiedBy[user].length;
    }

    function getClassesTaughtBy(address user, uint256 i) public view returns (uint256) {
      assert(i <= classesTaughtByCount(user));

        return classesTaughtBy[user][i];
    }

    function getClassesStudiedBy(address user, uint256 i) public view returns (uint256) {
      assert(i <= classesStudiedByCount(user));

        return classesStudiedBy[user][i];
    }

    function getChat(uint256 i, uint256 j) public view returns (Chat memory) {
      assert(i <= chatroom.length);
      assert(j <= chatroom[i].length);

      return chatroom[i][j];
    }

    function classChatCount(uint256 i) public view returns (uint256) {
      assert(i <= chatroom.length);

      return chatroom[i].length;
    }

    function isTeacher(uint256 i) public view returns (bool) {
      assert(i <= classes.length);

      if (classes[i].teacher == msg.sender) {
        return true;
      } else {
        return false;
      }
    }

    function hasPurchasedClass(uint256 i) public view returns (bool) {
      assert(i <= classes.length);

      for (uint256 j = 0; j < classes[i].students.length; j++) {
        if (classes[i].students[j] == msg.sender) {
          return true;
        }
      }
      return false;
    }

    function hasRatedClass(uint256 i) public view returns (bool) {
      assert(i <= classes.length);

      for (uint256 j = 0; j < classes[i].raters.length; j++) {
        if (classes[i].raters[j] == msg.sender) {
          return true;
        }
      }
      return false;
    }




    function createClass(string memory name, uint256 price, string memory description) public {
      assert(bytes(name).length > 0);
      assert(bytes(name).length <= 20);
      assert(price >= 0);
      assert(price <= 1000000);
      assert(bytes(description).length <= 2000);

      classes.push(Class(classes.length, name, msg.sender, price, 0, description, new address[](0), new address[](0)));
      classesTaughtBy[msg.sender].push(classes.length);
    }

    function editClassName(uint256 i, string memory n) public {
      assert(i <= classes.length);
      assert(bytes(n).length > 0);
      assert(bytes(n).length <= 20);
      assert(isTeacher(i));

      classes[i].name = n;
    }

    function editClassPrice(uint256 i, uint256 p) public {
      assert(i <= classes.length);
      assert(p >= 0);
      assert(p <= 1000000);
      assert(isTeacher(i));

      classes[i].price = p;
    }

    function editClassDescription(uint256 i, string memory d) public {
      assert(i <= classes.length);
      assert(bytes(d).length > 0);
      assert(bytes(d).length <= 2000);
      assert(isTeacher(i));

      classes[i].description = d;
    }

    function addLesson(uint256 i, string memory name, string memory content, string memory description)  public {
      assert(i <= classes.length);
      assert(bytes(name).length > 0);
      assert(bytes(name).length <= 20);
      assert(bytes(description).length <= 20000);
      assert(isTeacher(i));

      lessons[i].push(Lesson(name, content, description));
    }

    function editLessonName(uint256 i, uint256 j, string memory n) public {
      assert(i <= classes.length);
      assert(j <= lessons[i].length);
      assert(bytes(n).length > 0);
      assert(bytes(n).length <= 20);
      assert(isTeacher(i));

      lessons[i][j].name = n;
    }

    function editLessonContent(uint256 i, uint256 j, string memory c) public {
      assert(i <= classes.length);
      assert(j <= lessons[i].length);
      assert(isTeacher(i));

      lessons[i][j].content = c;
    }

    function editLessonDescription(uint256 i, uint256 j, string memory d) public {
      assert(i <= classes.length);
      assert(j <= lessons[i].length);
      assert(bytes(d).length > 0);
      assert(bytes(d).length <= 20000);
      assert(isTeacher(i));

      lessons[i][j].description = d;
    }

    function deleteLesson(uint256 i, uint256 j) public {
      assert(i <= classes.length);
      assert(j <= lessons[i].length);
      assert(isTeacher(i));

      delete lessons[i][j];
    }

    function purchaseClass(uint256 i) public payable {
      assert(i <= classes.length);
      assert(!isTeacher(i));
      assert(!hasPurchasedClass(i));
      assert(msg.value == classes[i].price);

      classes[i].teacher.transfer(msg.value);

      classes[i].students.push(msg.sender);
      classesStudiedBy[msg.sender].push(i);
    }

    function addRating(uint256 i, uint256 r) public {
      assert(i <= classes.length);
      assert(hasPurchasedClass(i));
      assert(!hasRatedClass(i));
      assert(i <= 5);

      classes[i].rating + r/classes[i].raters.length + 1;
      classes[i].raters.push(msg.sender);
    }

    function chat(uint256 i, string memory m) public payable {
      assert(i <= classes.length);
      assert(hasPurchasedClass(i));
      assert(bytes(m).length > 0);
      assert(bytes(m).length <= 200);

      chatroom[i].push(Chat(msg.sender, m));
    }
  }
