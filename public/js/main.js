$(document).on('ready', function () {
    $('#employeesTable').DataTable();

    $('#delete-btn').on('click', function (e) {
        e.preventDefault();
        var $self = $(this);
        $.ajax({
            url: '/delete',
            data: {id: $self.data('id')},
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.status) {
                    document.location.href = '/';
                } else {
                    alert(res.message);
                }
            }
        })
    })
});