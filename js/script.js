var $codeWrapper = $('.code-wrapper');
var $code = $codeWrapper.find('code');
var $eventsTableBody = $('.events-table tbody');
var rowTemplate = _.template($('#template-row').text());
var inputFormTemplate = _.template($('#template-input-form').text());

function tableUpdated() {

    var code = '<table>\n';
    $eventsTableBody.find('tr').each(function () {
        code += '\t<tr>\n';

        $(this).find('.data-cell').each(function () {
            code += '\t\t<td';
            if ($(this).hasClass('date-cell')) {
                code += ' width="50px"';
            }
            code += '>';

            if ($(this).hasClass('date-cell')) {
                code += '<b>' + $(this).text() + '</b>';
            } else {
                code += $(this).text();
            }
            code += '</td>\n';
        });

        code += '\t</tr>\n';
    });

    code += '</table>';

    $code.text(code);
    Prism.highlightElement($code[0]);
}

function addRow() {
    var $row = $(rowTemplate()).appendTo($eventsTableBody);

    $row.find('.data-cell').click(function () {

        var $cell = $(this);

        if ($cell.find('form').length == 0) {
            var formCode = inputFormTemplate({ 'value': $cell.text() });
            var $form = $(formCode).appendTo($cell);
            var $input = $form.find('input');
            $input.focus();
            $form.submit(function (event) {
                event.preventDefault();
                $cell.text($input.val());
                $form.remove();
                tableUpdated();
            });
        }
    });

    var deleteButton = $row.find('.button-delete');
    deleteButton.click(function () {
        $row.remove();
        tableUpdated();
    })

    tableUpdated();
}

for (var i = 0; i < 2; ++i) {
    addRow();
}

$('.button-add-row').click(addRow);

function selectElementText(element) {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.toString() == '') {
            sel.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(element[0]);
            sel.addRange(range);
        }
    } else if (document.selection) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(element[0]);
        textRange.select();
    }
}

$codeWrapper.click(function () {
    selectElementText($code);
});