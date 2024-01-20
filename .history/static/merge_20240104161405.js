const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      arrow = body.querySelector(".fa-arrow-left-long")

arrow.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
})

/**
 * @link https://github.com/hicodersofficial/custom-html-css-js-widgets/tree/main/tag-input-field
 * INSTAGRAM: @hi.coders
 */

const tagInput = document.querySelector(".tag-input");
const tagArea = document.querySelector(".tag-area");
const ul = document.querySelector(".tag-area ul");
const label = document.querySelector(".label");

let tags = [];

function addEvent(element) {
    tagArea.addEventListener("click", () => {
        element.focus();
    });

    element.addEventListener("focus", () => {
        tagArea.classList.add("active");
        label.classList.add("label-active");
    });

    element.addEventListener("blur", (e) => {
        tagArea.classList.remove("active");
        if (element.value === "" && tags.length === 0) {
            label.classList.remove("label-active");
        }
        if (!element.value.match(/^\s+$/gi) && element.value !== "") {
            tags.push(e.target.value.trim());
            element.value = "";
            renderTags();
        }
    });
    /**
     * NOTE: Keyboard events works unexpected on mobile devices.
     * For mobile devices you need to add this code
     * to get the last character user entered.
     * value[value.length - 1] === " "
     *
     * keycode 32 is for SpaceBar
     * keycode 13 is for EnterKey
     */

    element.addEventListener("keydown", (e) => {
        console.log(e);
        const value = e.target.value;
        if (
            (e.keyCode === 32 ||
                e.keyCode === 13 ||
                value[value.length - 1] === " ") &&
            !value.match(/^\s+$/gi) &&
            value !== ""
        ) {
            tags.push(e.target.value.trim());
            element.value = "";
            renderTags();
        }
        if (e.keyCode === 8 && value === "") {
            tags.pop();
            renderTags();
        }
    });
}
addEvent(tagInput);

function renderTags() {
    ul.innerHTML = "";
    tags.forEach((tag, index) => {
        createTag(tag, index);
    });
    const input = document.createElement("input");
    input.type = "text";
    input.className = "tag-input";
    addEvent(input);
    ul.appendChild(input);
    input.focus();
    setTimeout(() => (input.value = ""), 0);
}

function createTag(tag, index) {
    const li = document.createElement("li");
    li.className = "tag";
    const text = document.createTextNode(tag);
    const span = document.createElement("span");
    span.className = "cross";
    span.dataset.index = index;
    span.addEventListener("click", (e) => {
        tags = tags.filter((_, index) => index != e.target.dataset.index);
        renderTags();
    });
    li.appendChild(text);
    li.appendChild(span);
    ul.appendChild(li);
}
  

  var selectInit = function() {
    $('.select_wrap_old option').filter(function () {
      if ($(this).is(':selected')) {
        var targetOpt = $(this);
        select_placeholder(targetOpt);
      }
    });
  }

  var selectFunction = function () {
    $('.select_wrap_old select').on('change', function () {
      var targetOpt = $(this).find('option:selected');
      select_placeholder(targetOpt);
    })
  }

  var select_placeholder = function (targetOpt) {
    var selectedTxt = targetOpt.text(),
      plc = targetOpt.closest('.select_wrap_old').find('.select_placeholder');
    plc.text(selectedTxt);
  }

  selectInit();
  selectFunction();

  // Search functionality
  function myFunction() {
    var dropdown = document.getElementById("mySelect");
    dropdown.classList.toggle("show");
  }

  function filterFunction() {
    var input, filter, select, option, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    select = document.getElementById("mySelect");
    option = select.getElementsByTagName("option");
    for (i = 0; i < option.length; i++) {
      txtValue = option[i].textContent || option[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        option[i].style.display = "";
      } else {
        option[i].style.display = "none";
      }
    }
  }

  $(document).ready(function() {
    // Initialize Select2 for the original dropdown
    $('#dropdownInput').select2();

    // Initialize Select2 for the searchable dropdown
    $('#myDropdown a').select2();
  });

  $(document).ready(function() {

    // get the name of uploaded file
    $('input[type="file"]').change(function(){
      var value = $("input[type='file']").val();
      $('.js-value').text(value);
    });
  
  });

