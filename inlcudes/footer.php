<footer class="footer">
    <div class="footer-container">
        <div class="footer-section">
            <h3>📦 PostaWeb</h3>
            <p>Modern postal and package tracking platform.</p>
        </div>
        <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="index.php#hero">Home</a></li>
                <li><a href="index.php#about">About Us</a></li>
                <li><a href="index.php#contact">Contact</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h4>Contact</h4>
            <p>📧 postaweb.finiteloop@gmail.com</p>
            <p>📍 Tirane, Shqiperi</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; <?= date('Y') ?> PostaWeb - Finite Loop Team</p>
    </div>
</footer>

<!-- LOGIN MODAL -->
<div id="loginModal" class="modal" style="display:none;">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>Hyr ne PostaWeb</h2>
        <form id="loginForm">
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Fjalekalimi</label>
                <input type="password" name="password" required>
            </div>
            <p id="loginError" class="error-msg" style="display:none;"></p>
            <button type="submit" class="btn-primary">Hyr</button>
        </form>
        <p class="modal-footer">
            Nuk keni llogari? <a href="#" id="showRegister">Krijo Llogari</a>
        </p>
    </div>
</div>

<!-- REGISTER MODAL -->
<div id="registerModal" class="modal" style="display:none;">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>Krijo Llogari</h2>
        <form id="registerForm">
            <div class="form-group">
                <label>Emri i Plote</label>
                <input type="text" name="full_name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Telefoni</label>
                <input type="text" name="phone">
            </div>
            <div class="form-group">
                <label>Fjalekalimi (min 8 karaktere)</label>
                <input type="password" name="password" required minlength="8">
            </div>
            <p id="registerError" class="error-msg" style="display:none;"></p>
            <button type="submit" class="btn-primary">Regjistrohu</button>
        </form>
        <p class="modal-footer">
            Keni llogari? <a href="#" id="showLogin">Hyr</a>
        </p>
    </div>
</div>

<script src="assets/js/main.js"></script>
</body>
</html>