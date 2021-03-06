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
    uint256[] lessons;
  }

  struct Lesson {
    uint256 c;
    string name;
    string content;
    string description;
  }

    Class[] public classes;
    Lesson[] public lessons;

    mapping(address => uint256[]) public classesTaughtBy;
    mapping(address => uint256[]) public classesStudiedBy;




    function getClass(uint256 i) public view returns (Class memory) {
      assert(i <= classes.length);

        return classes[i];
    }

    function getLesson(uint256 i) public view returns (Lesson memory) {
      assert(i <= lessons.length);

        return lessons[i];
    }

    function getClassCount() public view returns (uint256) {
        return classes.length;
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
      assert(price <= 1000000);
      assert(bytes(description).length <= 200);

      classes.push(Class(classes.length, name, msg.sender, price, 0, description, new address[](0), new address[](0), new uint256[](0)));
      classesTaughtBy[msg.sender].push(classes.length);
    }

    //TODO function editClass
    //TODO function deleteClass

    function addLesson(uint256 i, string memory name, string memory content, string memory description)  public {
      assert(i <= classes.length);
      assert(bytes(name).length > 0);
      assert(bytes(name).length <= 20);
      assert(bytes(description).length <= 200);

      lessons.push(Lesson(i, name, content, description));
      classes[i].lessons.push(lessons.length);
    }

    //TODO function editLesson
    //TODO function deleteLesson

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
  }

  //TODO addComments
  //TODO addForum
