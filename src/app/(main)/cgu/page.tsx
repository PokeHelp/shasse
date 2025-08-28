import {Link, PageLayout, Typography} from "@components";
import {JSX} from "react";

export default function Page(): JSX.Element
{
    return (
        <PageLayout>
            <div className="mb-5">
                <Typography as="h1">
                    Conditions Générales d’Utilisation (CGU)
                </Typography>
                <Typography as="p">
                    Les présentes Conditions Générales d’Utilisation (ci‑après « CGU ») encadrent l’accès et
                    l’utilisation du site <strong>Pokehelp</strong> accessible à l’adresse <strong>pokehelp.fr</strong>,
                    proposant un compteur de shasse Pokémon shiny et des fonctionnalités associées.
                </Typography>
                <Typography as="p">
                    En accédant au service, vous acceptez sans réserve ces CGU. Si vous n’acceptez pas les CGU, veuillez
                    ne pas utiliser le service.
                </Typography>

                <Typography as={"h2"}>
                    Sommaire
                </Typography>
                <ul className="ms-4">
                    <li><Link href="#definitions">1. Définitions</Link></li>
                    <li><Link href="#acces">2. Accès au service</Link></li>
                    <li><Link href="#compte">3. Comptes & Sécurité</Link></li>
                    <li><Link href="#usage">4. Règles d’usage</Link></li>
                    <li><Link href="#donnees">5. Données & Confidentialité</Link></li>
                    <li><Link href="#propriete">6. Propriété intellectuelle</Link></li>
                    <li><Link href="#contenus">7. Contenus utilisateur</Link></li>
                    <li><Link href="#tiers">8. Services tiers</Link></li>
                    <li><Link href="#disponibilite">9. Disponibilité & Maintenance</Link></li>
                    <li><Link href="#securite">10. Sécurité</Link></li>
                    <li><Link href="#responsabilite">11. Responsabilité</Link></li>
                    <li><Link href="#modif">12. Modifications des CGU</Link></li>
                    <li><Link href="#contact">13. Contact</Link></li>
                </ul>
            </div>

            <Typography as="section" id="definitions">
                <Typography as="h2">1. Définitions</Typography>
                <Typography as="p">
                    <strong>Service</strong> : l’application web <em>Pokehelp</em>. <br/>
                    <strong>Utilisateur</strong> : toute personne accédant au Service. <br/>
                    <strong>Compte</strong> : espace personnel permettant d’accéder aux fonctionnalités (création de
                    shasses, compteur, etc.).
                </Typography>
            </Typography>

            <Typography as="section" id="acces">
                <Typography as="h2">2. Accès au service</Typography>
                <Typography as="p">
                    Le Service est accessible 24/7 sous réserve d’interruptions de maintenance. L’éditeur s’efforce
                    d’assurer une disponibilité optimale sans garantie de résultat.
                </Typography>
                <Typography as="p">
                    Certains espaces sont réservés aux utilisateurs connectés. L’accès peut être restreint en cas de
                    non‑respect des CGU.
                </Typography>
            </Typography>

            <Typography as="section" id="compte">
                <Typography as="h2">3. Comptes & Sécurité</Typography>
                <ul className="ms-4">
                    <li>
                        La création d’un Compte nécessite un email valide et un mot de passe fort. Vous êtes responsable
                        de la confidentialité de vos identifiants.
                    </li>
                    <li>
                        Tout accès ou usage frauduleux doit être signalé sans délai à : <Link
                        href="mailto:contact@pokehelp.fr">contact@pokehelp.fr</Link>.
                    </li>
                    <li>
                        L’éditeur peut suspendre ou résilier un Compte en cas de violation des CGU ou de comportement
                        malveillant.
                    </li>
                </ul>
            </Typography>

            <Typography as="section" id="usage">
                <Typography as="h2">4. Règles d’usage</Typography>
                <ul>
                    <li>
                        Utilisation conforme aux lois applicables et à l’objet du Service (gestion de shasses, compteur,
                        etc.).
                    </li>
                    <li>
                        Interdiction de : tentatives d’intrusion, scraping abusif, contournement des mesures de
                        sécurité, diffusion de contenus illicites.
                    </li>
                    <li>
                        L’éditeur se réserve le droit de limiter certaines fonctionnalités pour des raisons de sécurité.
                    </li>
                </ul>
            </Typography>

            <Typography as="section" id="donnees">
                <Typography as="h2">5. Données & Confidentialité</Typography>
                <Typography as="h2">
                    Les traitements de données (email, pseudonyme, données de shasse, journaux techniques) sont réalisés
                    conformément à la réglementation applicable (RGPD).
                </Typography>
                <ul>
                    <li>
                        Finalités : gestion du Compte, fonctionnement du compteur, support, sécurité et amélioration du
                        Service.
                    </li>
                    <li>
                        Vos droits : accès, rectification, suppression, opposition via <Link
                        href="mailto:contact@pokehelp.fr">contact@pokehelp.fr</Link>.
                    </li>
                </ul>
            </Typography>

            <Typography as="section" id="propriete">
                <Typography as="h2">6. Propriété intellectuelle</Typography>
                <Typography as="p">
                    Le code, la charte graphique et les contenus édités par l’éditeur sont protégés. Les marques et
                    visuels relatifs à Pokémon appartiennent à leurs titulaires respectifs (Nintendo, Game Freak, The
                    Pokémon Company) et ne sont utilisés qu’à titre descriptif.
                </Typography>
            </Typography>

            <Typography as="section" id="contenus">
                <Typography as="h2">7. Contenus utilisateur</Typography>
                <Typography as="p">
                    Vous êtes responsable des informations que vous enregistrez (nom de shasse, pseudo…). Vous
                    garantissez ne pas publier de contenus illicites ou portant atteinte aux droits de tiers. Vous
                    accordez à l’éditeur une licence non exclusive pour héberger ces contenus aux seules fins du
                    Service.
                </Typography>
            </Typography>

            <Typography as="section" id="tiers">
                <Typography as="h2">8. Services tiers</Typography>
                <Typography as="p">
                    Le Service peut s’appuyer sur des services tiers (ex. envoi d’emails, hébergement). Leur usage est
                    régi par leurs propres conditions. L’éditeur ne saurait être responsable d’une indisponibilité
                    imputable à un tiers.
                </Typography>
            </Typography>

            <Typography as="section" id="disponibilite">
                <Typography as="h2">9. Disponibilité & Maintenance</Typography>
                <ul>
                    <li>
                        Des opérations de maintenance peuvent être effectuées avec ou sans préavis.
                    </li>
                    <li>
                        Des sauvegardes et mécanismes de supervision sont mis en place pour améliorer la continuité de
                        service.
                    </li>
                </ul>
            </Typography>

            <Typography as="section" id="securite">
                <Typography as="h2">10. Sécurité</Typography>
                <ul>
                    <li>
                        Mesures techniques : chiffrement TLS, politiques de mots de passe forts, mises à jour de
                        sécurité, journalisation.
                    </li>
                    <li>
                        Signalement des vulnérabilités : écrivez à <Link
                        href="mailto:contact@pokehelp.fr">contact@pokehelp.fr</Link>. Merci de ne pas publier
                        publiquement avant correctif.
                    </li>
                </ul>
            </Typography>

            <Typography as="section" id="responsabilite">
                <Typography as="h2">11. Responsabilité</Typography>
                <ul>
                    <li>
                        Le Service est fourni « en l’état ». L’éditeur ne garantit ni l’absence d’erreurs, ni la
                        compatibilité avec tout équipement.
                    </li>
                    <li>
                        L’éditeur ne saurait être responsable des dommages indirects, pertes de données ou préjudices
                        résultant d’un usage non conforme des fonctionnalités.
                    </li>
                </ul>
            </Typography>

            <Typography as="section" id="modif">
                <Typography as="h2">12. Modifications des CGU</Typography>
                <Typography as="p">
                    Les CGU peuvent évoluer. En cas de modification substantielle, une information pourra être affichée
                    sur le site. La poursuite de l’utilisation vaut acceptation des CGU mises à jour.
                </Typography>
            </Typography>

            <Typography as="section" id="contact">
                <Typography as="h2">13. Contact</Typography>
                <Typography as="p">
                    Éditeur : Joignable au mail <Link href="mailto:contact@pokehelp.fr">contact@pokehelp.fr</Link>
                </Typography>
                <Typography as="p">
                    Hébergeur : <strong>Dyjix</strong>.
                </Typography>
            </Typography>
        </PageLayout>
    )
}