# Rating

Stars: to show how something was rated, or to rate it. Filled stars are teal; empty ones are outlines in the field-border colour.

- Each `.pc-rating-star` holds a Phosphor `star` (the outline) and `star-fill` (cut to `--fill`, 0–100%), so part of a star can fill: 4.2 fills the fifth star a fifth of the way.
- To show one: `.pc-rating` with `.pc-rating-stars` (`role="img"`, `aria-label="4.2 out of 5"`), the number in `.pc-rating-value`, and how many rated in `.pc-rating-count` ("128 ratings"). In a row, `.pc-rating-compact`: one star and the number.
- To set one: `.pc-rating-input` (`role="radiogroup"`, `aria-label`) of five `<label class="pc-rating-star">`, each around a radio (`aria-label="3 stars"`) that stays out of sight. The chosen star and those before it fill; under the pointer, the stars up to it fill lighter until clicked. Keyboard focus rings the chosen star, and the arrow keys move it, as in any radio group.
- Say what the number means beside it, in `.pc-rating-count`: "Good", "Not rated yet".
- The stars you click are 20px in 28px targets, the one place an icon is bigger than 16px; stars that only show a rating are 16px.
