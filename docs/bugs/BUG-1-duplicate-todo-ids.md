# BUG-1: Editing or deleting the second default todo affects the first one

The app starts with two default todos, "Pay electric bill" and "Walk the dog".
Both rows get the same `data-id`, and the app finds todos by id, so anything
you do to the second todo lands on the first one instead.

Steps to reproduce:

1. Open http://localhost:8080/todo with an empty list (clear local storage
   and reload if the defaults are missing).
2. Double-click "Walk the dog" to edit it.
3. "Pay electric bill" opens for editing instead.

The checkbox and the delete button have the same problem. Checking "Walk the
dog" actually completes the first todo in storage, which leaves the page in a
strange state: both rows look checked, but there is no strikethrough on the
second one and the counter still says "1 item left".

Happens in Chromium, Firefox and WebKit.
