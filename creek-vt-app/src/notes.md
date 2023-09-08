Sections

## Header Navbar elements

# Nav(.navbar)

+navbar-expand-lg
+navbar-dark
+bg-dark

# -> NavLink(.navbar-brand)

    +mobile-hide href="https://creekvt.com
    +img src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png" (Creek VT Logo)

## -> Button(.navbar-toggler)

    +type="button
    +data-toggle="collapse"
    +data-target="#navbarSupportedContent" (a)
    +aria-controls="navbarSupportedContent"
    +aria-expanded="false"
    +aria-label="Toggle Navigation"
    <span class="navbar-toggler-icon" />

## -> Container(.collapse navbar-collapse)
  +id="navbarSupportedContent" (a)
  # ListGroup(.nav navbar-nav)
    ->ListGroupItem(.nav-item dropdown)
    